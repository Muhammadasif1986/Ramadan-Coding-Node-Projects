// Student Management System
// This project is a simple console based Student Management System. In this project you
//  will be learning how to add new students, how to generate a 5 digit unique studentID 
//  for each student, how to enroll students in the given courses. Also, you will be implementing
//  the following operations enroll, view balance, pay tuition fees, show status, etc. The status
//  will show all the details of the student including name, id, courses enrolled and balance.
//  This is one of the best projects to implement the Object Oriented Programming concepts.

class Student {
  name: string;
  studentID: number;
  courses: string[];
  balance: number;
  constructor(name: string) {
    this.name = name;
    this.studentID = this.StudentID();
    this.courses = [];
    this.balance = 0;
  }
private StudentID(): number {
    return Math.floor(Math.random() * 9000) + 10000;
  }  
  enroll(...course: string[]) {
    this.courses.push(...course);
    this.balance += 15000
  }
viewBalance(){
  console.log(`your Balance is ${this.balance}`);
  
}
TuitionFees(pay:number){
  this.balance -= pay;
}
showStatus(){
  console.log(`Name: ${this.name}`);
  console.log(`Student ID: ${this.studentID}`);
  console.log(`Courses Enrolled: ${this.courses.join(', ')}`);
  console.log(`Balance: ${this.balance}`);
}

}

let students = new Student("Muhammad Asif")
students.TuitionFees(3000)
students.enroll("typeScript","JavaScript","python","C++")
students.showStatus()
console.log(students);


