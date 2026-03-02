import Vehicles from "./Vehicles";
import Parts from "./Parts";

export default function Home() {
  return (
    <>
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome to ScrapMart 🚗</h1>
      <p className="mt-4">Buy and sell old vehicles & spare parts in Yavatmal.</p>
    </div>

    <Vehicles/>
    <Parts/>
    </>
  );
}