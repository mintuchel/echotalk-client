import { Link } from "react-router-dom"
import logo from "@/assets/logo.png"

export function Logo() {
  return (
    <Link to="http://localhost:8000"className="flex items-center gap-2">
      <img width={40} height={40} src={logo} alt="logo"/>
      <h1 className="text-3xl font-bold">EchoTalk</h1>
    </Link>
  );
}