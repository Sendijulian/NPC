import { Button } from "@/components/ui/button";
import instance from "@/instance";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if (userId) {
      navigate("/dashboard");
    }
  });
  const Auth = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await instance.post("/users", {
      name: email,
      email,
      password,
      confPassword,
    });
    navigate("/login");
    setLoading(false);
  };
  return (
    <div className="flex flex-col  px-10 h-screen">
      <div className="self-start my-6">
        <h1 className="text-3xl text-primary font-bold">Daftar</h1>
      </div>
      <div>
        <form onSubmit={Auth} className="flex flex-col items-center gap-5">
          <div className="flex flex-col w-full">
            <label htmlFor="" className="font-semibold text-xl text-primary">
              Username
            </label>
            <input
              type="text"
              className="border-2 border-primary rounded-lg text-sm px-3 py-2 w-full"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="" className="font-semibold text-xl text-primary">
              Password
            </label>
            <input
              type="password"
              className="border-2 border-primary rounded-lg text-sm px-3 py-2 w-full"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="" className="font-semibold text-xl text-primary">
              Konfirmasi Password
            </label>
            <input
              type="password"
              className="border-2 border-primary rounded-lg text-sm px-3 py-2 w-full"
              placeholder="Masukkan Konfirmasi Password"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
          </div>
          <div>
            <Button type="submit" className="font-bold w-60">
              {loading ? "Loading..." : "Daftar"}
            </Button>
          </div>
          <div>
            <p className="text-sm text-primary">
              Sudah punya akun?{" "}
              <Link to="/login" className="font-bold underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
