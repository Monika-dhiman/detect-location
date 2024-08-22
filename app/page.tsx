import Image from "next/image";
import CheckIn from "./components/CheckIn";
import ValidateCheckIn from "./components/ValidateCheckIn";

export default function Home() {
  return (
    <div>
      <h1>Check In</h1>
      <CheckIn />  {/* Free of cost */}
    </div>
  );
}
