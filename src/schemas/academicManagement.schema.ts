import { z } from "zod";

export const createAcademicSemesterSchema = z.object({
  name: z.string({ required_error: "Please select a name" }),
  year: z.string({ required_error: "Please select a year" }),
  startMonth: z.string({ required_error: "Please select a Start Month" }),
  endMonth: z.string({ required_error: "Please select a End Month" }),
});

export const createAcademicFacultySchema = z.object({
  name: z.string({ required_error: "Please Write a valid name" }),
});

export const createAcademicDepartmentSchema = z.object({
  name: z.string({ required_error: "Please Write a valid name" }),
  academicFaculty: z.string({
    required_error: "Please Select a Academic Department",
  }),
});

const timeSchema = z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
  message: "Time must be in HH:MM format",
});

// create zod schema

const guardianSchema = z.object({
  fatherName: z.string({
    required_error: "Father's name is required",
  }),
  fatherOccupation: z.string({
    required_error: "Father's occupation is required",
  }),
  fatherContactNo: z
    .string({
      required_error: "Father's contact number is required",
    })
    .regex(
      /^\d{3}-\d{3}-\d{4}$/,
      "Father's contact number must be in the format XXX-XXX-XXXX"
    ),
  motherName: z.string({
    required_error: "Mother's name is required",
  }),
  motherOccupation: z.string({
    required_error: "Mother's occupation is required",
  }),
  motherContactNo: z
    .string({
      required_error: "Mother's contact number is required",
    })
    .regex(
      /^\d{3}-\d{3}-\d{4}$/,
      "Mother's contact number must be in the format XXX-XXX-XXXX"
    ),
});

const localGuardianSchema = z.object({
  name: z.string({
    required_error: "Local guardian's name is required",
  }),
  occupation: z.string({
    required_error: "Local guardian's occupation is required",
  }),
  contactNo: z
    .string({
      required_error: "Local guardian's contact number is required",
    })
    .regex(
      /^\d{3}-\d{3}-\d{4}$/,
      "Local guardian's contact number must be in the format XXX-XXX-XXXX"
    ),
  address: z.string({
    required_error: "Local guardian's address is required",
  }),
});

const studentSchema = z.object({
  name: z.object({
    firstName: z.string({
      required_error: "First name is required",
    }),
    middleName: z.string({
      required_error: "Middle name is required",
    }),
    lastName: z.string({
      required_error: "Last name is required",
    }),
  }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Gender is required",
  }),
  dateOfBirth: z
    .string({
      required_error: "Date of birth is required",
    })
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Date of birth must be in the format YYYY-MM-DD"
    ),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  contactNo: z
    .string({
      required_error: "Contact number is required",
    })
    .regex(/^\d+$/, "Contact number must only contain digits"),
  emergencyContactNo: z
    .string({
      required_error: "Emergency contact number is required",
    })
    .regex(
      /^\d{3}-\d{3}-\d{4}$/,
      "Emergency contact number must be in the format XXX-XXX-XXXX"
    ),
  bloogGroup: z
    .string({
      required_error: "Blood group is required",
    })
    .regex(
      /^(A|B|AB|O)[+-]$/,
      "Blood group must be A+, A-, B+, B-, AB+, AB-, O+, or O-"
    ),
  presentAddress: z.string({
    required_error: "Present address is required",
  }),
  permanentAddress: z.string({
    required_error: "Permanent address is required",
  }),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  admissionSemester: z
    .string({
      required_error: "Admission semester is required",
    })
    .regex(/^[a-f0-9]{24}$/, "Invalid admission semester ID"),
  academicDepartment: z
    .string({
      required_error: "Academic department is required",
    })
    .regex(/^[a-f0-9]{24}$/, "Invalid academic department ID"),
});

export const createStudentSchema = z.object({
  password: z.string().optional(),
  student: studentSchema,
});

export const offeredCourseSchema = z.object({
  semesterRegistration: z
    .string({ required_error: "semesterRegistration is required" })
    .length(24, {
      message: "semesterRegistration must be exactly 24 characters long",
    }),
  academicFaculty: z
    .string({ required_error: "academicFaculty is required" })
    .length(24, {
      message: "academicFaculty must be exactly 24 characters long",
    }),
  academicDepartment: z
    .string({ required_error: "academicDepartment is required" })
    .length(24, {
      message: "academicDepartment must be exactly 24 characters long",
    }),
  course: z
    .string({ required_error: "course is required" })
    .length(24, { message: "course must be exactly 24 characters long" }),
  faculty: z
    .string({ required_error: "faculty is required" })
    .length(24, { message: "faculty must be exactly 24 characters long" }),
  section: z.string({ required_error: "section is required" }),
  maxCapacity: z.string({ required_error: "maxCapacity is required" }),
  days: z
    .array(
      z.enum(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], {
        required_error: "Invalid day",
      })
    )
    .nonempty({ message: "days is required" }),
  startTime: timeSchema,
  endTime: timeSchema,
});
