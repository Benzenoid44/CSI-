import { useState } from "react";

export default function Signup() {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    email: "",
    password: "",
    post_id: "",
  });

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setFormData({ name: "", rollNo: "", email: "", password: "", post_id: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = `http://localhost:5000/signup/${role.toLowerCase()}`;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Signup Successful!");
      } else {
        alert("Signup Failed: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-blue-500">
        {!role ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-700 mb-6">Select Your Role</h2>
            <div className="flex flex-col space-y-4">
              <button className="bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300" onClick={() => handleRoleSelect("Student")}>
                Student
              </button>
              <button className="bg-green-500 text-white py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300" onClick={() => handleRoleSelect("Teacher")}>
                Teacher
              </button>
              <button className="bg-purple-500 text-white py-3 rounded-lg shadow-md hover:bg-purple-600 transition duration-300" onClick={() => handleRoleSelect("Committee")}>
                Committee
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">Sign Up as {role}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400" required />
              </div>
              {role === "Student" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Roll No.</label>
                  <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400" required />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400" required />
              </div>
              {role === "Committee" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Post ID</label>
                  <input type="text" name="post_id" value={formData.post_id} onChange={handleChange} className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400" required />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 p-3 w-full border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400" required />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                Sign Up
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/*import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ArrowLeft } from "lucide-react";

export default function Signup() {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    email: "",
    password: "",
    post_id: "",
  });

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setFormData({ name: "", rollNo: "", email: "", password: "", post_id: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = `http://localhost:5000/signup/${role.toLowerCase()}`;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Signup Successful!");
      } else {
        alert("Signup Failed: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      <div className="w-full max-w-md">
        {!role ? (
          <Card className="bg-zinc-800 border-zinc-700 text-white p-6 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Select Your Role</CardTitle>
              <CardDescription className="text-zinc-400 text-center">Choose your account type</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-3">
              <Button className="bg-blue-600 hover:bg-blue-500" onClick={() => handleRoleSelect("Student")}>Student</Button>
              <Button className="bg-green-600 hover:bg-green-500" onClick={() => handleRoleSelect("Teacher")}>Teacher</Button>
              <Button className="bg-purple-600 hover:bg-purple-500" onClick={() => handleRoleSelect("Committee")}>Committee</Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-zinc-800 border-zinc-700 text-white p-6 shadow-lg">
            <CardHeader>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={() => setRole("")} className="text-zinc-400 hover:text-white mr-2">
                  <ArrowLeft size={18} />
                </Button>
                <div>
                  <CardTitle className="text-xl">{role} Sign Up</CardTitle>
                  <CardDescription className="text-zinc-400">Create your account as a {role}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} required className="bg-zinc-700 border-zinc-600 text-white" />
                </div>
                {role === "Student" && (
                  <div className="space-y-2">
                    <Label htmlFor="rollNo">Roll Number</Label>
                    <Input id="rollNo" name="rollNo" placeholder="Enter your roll number" value={formData.rollNo} onChange={handleChange} required className="bg-zinc-700 border-zinc-600 text-white" />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="Enter your email address" value={formData.email} onChange={handleChange} required className="bg-zinc-700 border-zinc-600 text-white" />
                </div>
                {role === "Committee" && (
                  <div className="space-y-2">
                    <Label htmlFor="post_id">Post ID</Label>
                    <Input id="post_id" name="post_id" placeholder="Enter your post ID" value={formData.post_id} onChange={handleChange} required className="bg-zinc-700 border-zinc-600 text-white" />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" placeholder="Create a password" value={formData.password} onChange={handleChange} required className="bg-zinc-700 border-zinc-600 text-white" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-zinc-600 hover:bg-zinc-500">Create Account</Button>
              </CardFooter>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}*/
