// import express application

const express = require("express");

// import body-parser module

const bodyParser = require("body-parser");

// import cors module
const cors = require("cors");

// import mongoose module

const mongoose = require("mongoose");
const mongoDBURI =
  "mongodb+srv://wassimmastour8:14757839Wassim.2021@cluster0.0bqszok.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDBURI),
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
// Session Configuration
const secretKey = "croco2023";
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
  })
);
//configuration multer
app.use("/images", express.static(path.join("backend/images")));
app.use("/files", express.static(path.join("backend/files")));

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "application/pdf": "pdf",
  "application/octet-stream": "pdf",
};

const storageConfig = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    let uploadPath = "backend/files"; // Default folder for images

    if (req.body.role == "teacher") {
      uploadPath = "backend/files"; // Specific folder for teachers
    }

    const isValid = MIME_TYPE[file.mimetype];

    if (!isValid) {
      const error = new Error("Mime type is invalid");
      error.code = "INVALID_MIME_TYPE";
      return cb(error, null);
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const ifname = name + "-" + Date.now() + "-crococoder-" + "." + extension;
    cb(null, ifname);
  },
});

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
app.post(
  "/courses",
  multer({ storage: storageConfig }).fields([{ name: "img", maxCount: 1 }]),
  (req, res) => {
    console.log("here into BL add course", req.body);
    User.findById(req.body.teacher).then((teacher) => {
      if (!teacher) {
        return res.json({ msg: "teacher not found" });
      }

      const course = new Course({
        name: req.body.name,
        description: req.body.description,
        duration: req.body.duration,
        teacher: teacher._id,
        img: `http://localhost:3000/files/${req.files["img"][0].filename}`,
      });

      course.save((err, doc) => {
        teacher.courses.push(course);
        teacher.save();
        res.json({ msg: "Course addedd with success" });
      });
    });
  }
);

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
// Assuming you have a route like '/courses/user/:userId'
app.get("/courses/user/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const courses = await Course.find({ teacher: userId }).populate("teacher");
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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

// business logic : get all classes :

app.get("/classes", (req, res) => {
  Class.find()
    .populate("teacher")
    .populate("students")
    .populate("course")
    .then((docs) => {
      console.log("Here into BL get all classes", docs);
      res.json({ classes: docs });
    });
});

// business logic : get class by ID

app.get("/classes/:id", (req, res) => {
  Class.findById(req.params.id)
    .populate("students")
    .populate("course")
    .populate("teacher")
    .then((doc) => {
      console.log("Here into BL get class by ID", doc);
      if (doc) {
        res.json({ class: doc });
      }
    });
});

// business Logic : delete class by ID

app.delete("/classes/:id", (req, res) => {
  Class.deleteOne({ _id: req.params.id }).then((deletedItem) => {
    console.log("Here deleted Item", deletedItem);
    if (deletedItem.deletedCount == 1) {
      res.json({ msg: "Deleted with success" });
    } else {
      res.json({ msg: "Error" });
    }
  });
});

// Business logic: edit class
app.put("/classes/:id", async (req, res) => {
  const classId = req.params.id;
  console.log("Here into BL edit class", req.body);

  try {
    const existingClass = await Class.findById(classId);

    if (!existingClass) {
      return res.status(404).json({ msg: "Class not found" });
    }

    const { name, teacherId, studentIds, courseId } = req.body;

    if (name) {
      existingClass.name = name;
    }

    if (teacherId) {
      const teacher = await User.findById(teacherId);
      if (!teacher) {
        return res.status(404).json({ msg: "Teacher not found" });
      }
      existingClass.teacher = teacher._id;
    }

    if (courseId) {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ msg: "Course not found" });
      }
      existingClass.course = course._id;
    }

    if (studentIds) {
      // Remove existing students
      existingClass.students = [];

      const students = await User.find({ _id: { $in: studentIds } });

      // Update the students array using $push
      existingClass.students = students.map((student) => student._id);

      students.forEach(async (student) => {
        student.classes.push(existingClass);
        await student.save();
      });
    }

    await existingClass.save();

    res.json({ msg: "Class edited with success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to edit class" });
  }
});

//business logic : get classes by student ID
app.get("/classes/student/:studentId", async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const classes = await Class.find({ students: studentId })
      .populate("students")
      .populate("teacher")
      .populate("course");
    res.status(200).json({ classes });
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//business logic : get evaluations by student ID
app.get("/evaluations/student/:studentId", async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const evaluations = await Evaluation.find({ student: studentId })
      .populate("student")
      .populate("course");
    res.status(200).json({ evaluations });
  } catch (error) {
    console.error("Error fetching evaluations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// business logic get all evaluations :
app.get("/evaluations", (req, res) => {
  Evaluation.find()
    .populate("student")
    .populate("course")
    .then((docs) => {
      console.log("here into bl get all evaluations", docs);
      if (docs) {
        res.json({ evaluations: docs });
      }
    });
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

// business logic update status
app.put("/users/status", async (req, res) => {
  const updatedUser = req.body;
  console.log("here updated user", updatedUser);

  try {
    const result = await User.updateOne(
      { _id: updatedUser._id },
      { $set: updatedUser }
    );

    if (result.nModified === 1) {
      res.json({ msg: "updated with success" });
    } else {
      res.json({ msg: "error" });
    }
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// business logic : search teacher by speciality
app.post("/users/search-teachers", async (req, res) => {
  const { specialty } = req.body;
  console.log("here speciality", req.body);
  if (!specialty) {
    return res.status(400).json({ error: "Specialty is required" });
  }

  try {
    const searchResults = await User.find({
      role: "teacher",
      speciality: specialty,
    });
    console.log("Search Results:", searchResults);

    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// business logic search class of children:

app.post("/users/search-classes-for-child", (req, res) => {
  console.log("here into BL search class", req.body);

  const { childPhoneNumber } = req.body; // Extract phone number from the request body

  User.findOne({ phone: childPhoneNumber })
    .populate("classes")
    .populate({
      path: "classes",
      populate: {
        path: "teacher",
      },
    })
    .populate({
      path: "classes",
      populate: {
        path: "course",
      },
    })

    .then((doc) => {
      console.log("Here child object", doc);
      if (!doc) {
        return res.json({ msg: "child not found" });
      }
      return res.json({ classes: doc.classes });
    })
    .catch((error) => {
      console.error("Error searching classes for child:", error);
      return res.status(500).json({ msg: "Internal Server Error" });
    });
});

// business logic : search evaluations for child
app.post("/users/search-evaluations-for-child", (req, res) => {
  console.log("here into BL search class", req.body);

  const { childPhoneNumber } = req.body; // Extract phone number from the request body

  User.findOne({ phone: childPhoneNumber })
    .populate("evaluations")
    .populate({
      path: "evaluations",
      populate: {
        path: "student",
      },
    })
    .populate({
      path: "evaluations",
      populate: {
        path: "course",
      },
    })
    .then((doc) => {
      console.log("Here child object", doc);
      if (!doc) {
        return res.json({ msg: "child not found" });
      }
      return res.json({ evaluations: doc.evaluations });
    })
    .catch((error) => {
      console.error("Error searching evaluations for child:", error);
      return res.status(500).json({ msg: "Internal Server Error" });
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
              status: result.status,
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

      let user;

      if (req.body.role == "student") {
        user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          phone: req.body.phone,
          img: req.body.img,
          address: req.body.address,
          role: req.body.role,
        });
      } else if (req.body.role == "teacher") {
        req.body.cv = `http://localhost:3000/files/${req.files["cv"][0].filename}`;
        req.body.img = `http://localhost:3000/files/${req.files["img"][0].filename}`;
        user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          phone: req.body.phone,
          cv: req.body.cv,
          address: req.body.address,
          status: req.body.status,
          role: req.body.role,
          speciality: req.body.speciality,
          img: req.body.img,
        });
      } else if (req.body.role == "parent") {
        const childDoc = await User.findOne({
          phone: req.body.childPhone,
          role: "student",
        });
        if (!childDoc) {
          return res.json({ msg: "Please verify your child's phone number" });
        }
        user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          phone: req.body.phone,
          address: req.body.address,
          role: req.body.role,
          childPhone: req.body.childPhone,
        });
      } else if (req.body.role == "admin") {
        user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          phone: req.body.phone,
          address: req.body.address,
          role: req.body.role,
        });
      }

      user.save((err, doc) => {
        if (err) {
          return res.json({ msg: "Failed" });
        } else {
          res.json({ msg: "Added with success" });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Failed" });
    }
  }
);

// business logic : search university
app.post("/universities", (req, res) => {
  console.log("Here into BL search university", req.body);
  let apiUrl = `http://universities.hipolabs.com/search?country=${req.body.cityName}`;
  axios.get(apiUrl).then((response) => {
    console.log("here api response", response.data);
    const universities = response.data.map((university) => ({
      name: university.name,
      country: university.country,
    }));

    res.json({ result: universities });
  });
});

// make app importable from another files
module.exports = app;
