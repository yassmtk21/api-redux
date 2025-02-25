import { useSelector } from "react-redux";
function pokemonInfo({ open, onCloseModal}) {

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible backdrop-blur-xs backdrop-grayscale" : "invisible"
      } `}
    >
      <div
        className={`transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <div className="bg-white border w-[200px] h-[100px] flex flex-col items-center justify-center">
          <h1>Model Is Open</h1>
          <button onClick={onCloseModal}>close</button>
        </div>
      </div>
    </div>
  );
}

export default pokemonInfo;
