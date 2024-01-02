// import express application

const express = require("express");

// import body-parser module

const bodyParser = require("body-parser");

// import cors module
const cors = require("cors");

// import mongoose module

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/educationDB"),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

// import bcrypt module
const bcrypt = require("bcrypt");
// import axios module

const axios = require("axios");

// import multer module

const multer = require("multer");

// import path module

const path = require("path");
// import jsonwebtoken module
const jwt = require("jsonwebtoken");

// import express-session module
const session = require("express-session");

// create express application

const app = express();

// cors configuration

app.use(cors());

// configuration bodyParser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Security configuration

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",

    "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",

    "GET, POST, DELETE, PATCH, PUT"
  );

  next();
});
//configuration multer
app.use("/images", express.static(path.join("backend/images")));
app.use("/files", express.static(path.join("backend/files")));

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const MIME_TYPE_ = {
  "application/pdf": "pdf",
  "application/octet-stream": "pdf",
};

const storageConfig = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "-crococoder-" + "." + extension;
    cb(null, imgName);
  },
});

const storageConfigPdf = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid =
      MIME_TYPE_["application/pdf"] || MIME_TYPE_["application/octet-stream"];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/files");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE_[file.mimetype];
    console.log("File MIME type:", file.mimetype); // Log the MIME type
    console.log("Extension:", extension); // Log the extension
    const cvName = name + "-" + Date.now() + "-crococoder-" + "." + extension;
    cb(null, cvName);
  },
});
// Session Configuration
const secretKey = "croco2023";
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
  })
);

//Models Importation
const User = require("./models/user");
const Course = require("./models/course");
const Evaluation = require("./models/evaluation");
const Class = require("./models/class");
// business Logic : get course by ID

app.get("/courses/:id", (req, res) => {
  Course.findById(req.params.id)
    .populate("teacher")
    .then((doc) => {
      res.json({ course: doc });
    });
});
// business logic : get all courses :

app.get("/courses", (req, res) => {
  Course.find()
    .populate("teacher")
    .then((docs) => {
      res.json({ courses: docs });
    });
});

// business Logic : delete course by ID

app.delete("/courses/:id", (req, res) => {
  Course.deleteOne({ _id: req.params.id }).then((deletedItem) => {
    console.log("Here deleted Item", deletedItem);
    if (deletedItem.deletedCount == 1) {
      res.json({ msg: "Deleted with success" });
    } else {
      res.json({ msg: "Error" });
    }
  });
});

// business logic : add course
app.post("/courses", (req, res) => {
  console.log("here into BL add course", req.body);
  User.findById(req.body.teacherId).then((teacher) => {
    if (!teacher) {
      return res.json({ msg: "teacher not found" });
    }
    const course = new Course({
      name: req.body.name,
      description: req.body.description,
      duration: req.body.duration,
      teacher: teacher._id,
    });

    course.save((err, doc) => {
      teacher.courses.push(course);
      teacher.save();
      res.json({ msg: "Course addedd with success" });
    });
  });
});

// business logic : edit course

app.put("/courses", (req, res) => {
  console.log("Here object from FE", req.body);
  Course.updateOne({ _id: req.body._id }, req.body).then((updatedResponse) => {
    console.log("here the user ID", req.body._id);
    if (updatedResponse.nModified == 1) {
      res.json({ msg: "is updated" });
    } else {
      res.json({ msg: "error" });
    }
  });
});

// Business logic: add class
app.post("/classes", async (req, res) => {
  console.log("Here into BL add class", req.body);

  try {
    const students = await User.find({ _id: { $in: req.body.studentIds } });
    const teacher = await User.findById(req.body.teacherId);
    const course = await Course.findById(req.body.courseId);

    if (!teacher) {
      return res.json({ msg: "Teacher not found" });
    }

    if (!course) {
      return res.json({ msg: "Course not found" });
    }

    const newClass = new Class({
      name: req.body.name,
      teacher: teacher._id,
      students: [], // Initialize with an empty array
      course: course._id,
    });

    const savedClass = await newClass.save();

    // Update the students array using $push
    await Class.updateOne(
      { _id: savedClass._id },
      { $push: { students: { $each: students.map((student) => student._id) } } }
    );

    students.forEach(async (student) => {
      student.classes.push(savedClass);
      await student.save();
    });
    // Update teacher's classes array
    teacher.classes.push(savedClass);
    await teacher.save();

    res.json({ msg: "Class added with success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to add class" });
  }
});

// business logic : add evaluation
app.post("/evaluations", (req, res) => {
  console.log("here into BL add evaluation", req.body);
  console.log("Student ID from Frontend:", req.body.studentId);

  User.findById(req.body.studentId).then((student) => {
    if (!student) {
      return res.json({ msg: "student not found" });
    }

    Course.findById(req.body.courseId).then((course) => {
      if (!course) {
        return res.json({ msg: "course not found" });
      }

      const evaluation = new Evaluation({
        note: req.body.note,
        evaluation: req.body.evaluation,
        student: student._id,
        course: course._id,
      });

      evaluation.save((err, doc) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ msg: "Failed to add evaluation" });
        }

        student.evaluations.push(evaluation);
        student.save();

        res.json({ msg: "Evaluation added with success" });
      });
    });
  });
});

// business logic : get all students
app.get("/users/students", (req, res) => {
  User.find({ role: "student" }).then((docs) => {
    res.json({ students: docs });
  });
});

// Business Logic : get all teachers and students
app.get("/users/teachers/students", (req, res) => {
  User.find({ role: { $in: ["teacher", "student"] } }).then((docs) => {
    res.json({ users: docs });
  });
});

// business logic : get all teachers
app.get("/users/teachers", (req, res) => {
  User.find({ role: "teacher" }).then((docs) => {
    res.json({ teachers: docs });
  });
});

// business Logic : get user by ID

app.get("/users/:id", (req, res) => {
  User.findById(req.params.id).then((doc) => {
    res.json({ user: doc });
  });
});

// business Logic : delete user by ID

app.delete("/users/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }).then((deletedItem) => {
    console.log("Here deleted Item", deletedItem);
    if (deletedItem.deletedCount == 1) {
      res.json({ msg: "Deleted with success" });
    } else {
      res.json({ msg: "Error" });
    }
  });
});

// business Logic : edit user

app.put("/users", (req, res) => {
  let obj = req.body;
  User.updateOne({ _id: req.body._id }, obj).then((updatedResponse) => {
    console.log("here user id", req.body._id);
    if (updatedResponse.nModified == 1) {
      res.json({ isUpdated: true });
    } else {
      res.json({ isUpdated: false });
    }
  });
});

// Business Logic : login

app.post("/users/login", (req, res) => {
  console.log("Here into BL : login", req.body);
  let result = {};

  // Use $or operator to find user by email or phone
  User.findOne({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  }).then((doc) => {
    console.log("here finded user by email or phone", doc);

    if (!doc) {
      return res.json({
        msg: "User not found. Please check your email or phone.",
      });
    } else {
      result = doc;
      console.log("Result", result);

      bcrypt.compare(req.body.password, doc.password).then((pwdCompare) => {
        console.log("here pwdCompare", pwdCompare);

        if (pwdCompare) {
          const token = jwt.sign(
            {
              firstName: result.firstName,
              lastName: result.lastName,
              id: result._id,
              role: result.role,
            },
            secretKey,
            { expiresIn: "1h" }
          );

          res.json({
            msg: "Welcome",
            token: token,
          });
        } else {
          res.json({ msg: "Incorrect password. Please check your password." });
        }
      });
    }
  });
});

// Business Logic : signup
app.post(
  "/users/subscription",
  multer({ storage: storageConfig }).fields([
    { name: "img", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log("Here into BL : signup", req.body, req.files);

    try {
      const existingUser = await User.findOne({ email: req.body.email });

      if (existingUser) {
        return res.json({ msg: "Oops email exists!" });
      }

      const cryptedPwd = await bcrypt.hash(req.body.password, 8);
      console.log("here crypted pwd", cryptedPwd);
      req.body.password = cryptedPwd;

      // Check if 'cv' file exists in req.files
      if (req.files["cv"] && req.files["cv"][0]) {
        req.body.cv = `http://localhost:3000/files/${req.files["cv"][0].filename}`;
      }

      // Check if 'img' file exists in req.files
      if (req.files["img"] && req.files["img"][0]) {
        req.body.img = `http://localhost:3000/images/${req.files["img"][0].filename}`;
      }

      const user = new User(req.body);
      await user.save(); // Use await to wait for the Promise to resolve

      res.json({ msg: "Added with success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Failed" });
    }
  }
);

// make app importable from another files
module.exports = app;
