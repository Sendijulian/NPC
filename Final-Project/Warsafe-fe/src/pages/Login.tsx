import { Button } from "@/components/ui/button";
import { LoginUser, reset } from "@/hook/authSlice";
import { AppDispatch } from "@/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state: any) => state.auth
  );
  useEffect(() => {
    if (user || isSuccess) {
      navigation("/home");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigation]);
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(LoginUser({ email: email, password: password }));
  };
  return (
    <div className="flex flex-col  px-10 h-screen">
      <div className="self-start my-6">
        <h1 className="text-3xl text-primary font-bold">Login</h1>
        {isError && <p className="text-red-500">{message}</p>}
      </div>
      <div>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center gap-5"
        >
          <div className="flex flex-col w-full">
            <label htmlFor="" className="font-semibold text-xl text-primary">
              Username
            </label>
            <input
              type="text"
              className="border-2 border-primary rounded-lg text-sm px-3 py-2 w-full"
              placeholder="Masukkan Username or Email"
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
          <div>
            <Button className="font-bold w-60">
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </div>
          <div>
            <p className="text-sm text-primary">
              Belum punya akun?{" "}
              <Link to="/register" className="font-bold underline">
                Daftar
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
