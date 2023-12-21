-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

DROP TYPE IF EXISTS "public"."ContractType";
CREATE TYPE "public"."ContractType" AS ENUM ('EMP', 'SUBCON');
DROP TYPE IF EXISTS "public"."Type";
CREATE TYPE "public"."Type" AS ENUM ('LEADER', 'MEMBER');

-- Table Definition
CREATE TABLE "public"."Attendance" (
    "id" text NOT NULL,
    "member_name" text,
    "location" text,
    "contract_type" "public"."ContractType" NOT NULL,
    "tool_box_no" text,
    "topic" text,
    "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp(3) NOT NULL,
    "member_emp_id" text,
    "leader_emp_id" text NOT NULL,
    "type" "public"."Type" NOT NULL,
    "execute_date" timestamp(3),
    "execute_time" text,
    "signature" text,
    CONSTRAINT "Attendance_leader_emp_id_fkey" FOREIGN KEY ("leader_emp_id") REFERENCES "public"."Employee"("emp_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

DROP TYPE IF EXISTS "public"."Type";
CREATE TYPE "public"."Type" AS ENUM ('LEADER', 'MEMBER');

-- Table Definition
CREATE TABLE "public"."Employee" (
    "id" text NOT NULL,
    "first_name" text NOT NULL,
    "last_name" text NOT NULL,
    "nic" text NOT NULL,
    "contact_no" text NOT NULL,
    "created_at" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp(3) NOT NULL,
    "type" "public"."Type" NOT NULL,
    "emp_id" text NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

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



INSERT INTO "public"."Employee" ("id", "first_name", "last_name", "nic", "contact_no", "created_at", "updated_at", "type", "emp_id") VALUES
('1', 'lakmal', 'madushani', '211v', '0112311454', '2023-12-02 15:11:05.536', '2023-12-04 06:15:30.286', 'LEADER', '1000');
INSERT INTO "public"."Employee" ("id", "first_name", "last_name", "nic", "contact_no", "created_at", "updated_at", "type", "emp_id") VALUES
('3', 'upahri', 'hansi', '234', '2342345', '2023-12-04 11:46:23.303', '2023-12-04 11:46:03.419', 'LEADER', '234');
INSERT INTO "public"."Employee" ("id", "first_name", "last_name", "nic", "contact_no", "created_at", "updated_at", "type", "emp_id") VALUES
('7', 'Ishara', 'Priyasad', '200131002274', '011292070', '2023-12-08 22:34:35.216', '2023-12-08 22:30:06.349', 'LEADER', '776');

INSERT INTO "public"."User" ("id", "username", "password", "employee_id", "created_at", "updated_at") VALUES
('2', 'hansi', '1234', '1', '2023-12-02 15:12:55.169', '2023-12-04 06:15:52.874');
INSERT INTO "public"."User" ("id", "username", "password", "employee_id", "created_at", "updated_at") VALUES
('4', 'abc', '1234', '3', '2023-12-04 11:46:39.594', '2023-12-04 11:46:26.362');
INSERT INTO "public"."User" ("id", "username", "password", "employee_id", "created_at", "updated_at") VALUES
('5', 'ishara', '1235', '7', '2023-12-08 22:34:46.29', '2023-12-11 10:10:39.601');
