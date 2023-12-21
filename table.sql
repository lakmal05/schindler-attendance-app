-- This script only contains the table creation statements and does not fully represent the table in the database. 
-- It's still missing: indices, triggers. Do not use it as a backup.


-- Table Definition
CREATE TABLE "public"."Employee" (
    "id" text NOT NULL,
    "first_name" text NOT NULL,
    "last_name" text NOT NULL,
    "nic" text NOT NULL,
    "contact_no" text NOT NULL,
    "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp(3) NOT NULL,
    "emp_id" text NOT NULL PRIMARY KEY, -- Adding a primary key constraint
    CONSTRAINT "Employee_emp_id_unique" UNIQUE ("emp_id") -- Adding a unique constraint
);

-- Table Definition
CREATE TABLE "public"."Attendance" (
    "id" text NOT NULL,
    "member_name" text,
    "location" text,
    "tool_box_no" text,
    "topic" text,
    "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp(3) NOT NULL,
    "member_emp_id" text,
    "leader_emp_id" text NOT NULL,
    "execute_date" timestamp(3),
    "execute_time" text,
    "signature" text,
    CONSTRAINT "Attendance_leader_emp_id_fkey" FOREIGN KEY ("leader_emp_id") REFERENCES "public"."Employee"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. 
-- It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."User" (
    "id" text NOT NULL,
    "username" text NOT NULL,
    "password" text NOT NULL,
    "employee_id" text NOT NULL,
    "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp(3) NOT NULL,
    CONSTRAINT "User_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);

