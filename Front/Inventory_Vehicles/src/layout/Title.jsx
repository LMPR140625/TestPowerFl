export function Title(props) {
  return (
    <section className="bg-linear-to-r from-black to-cyan-500 text-white px-5 pt-5 py-2">
      <div className="flex mx-auto text-center">
        <div className="">
          {props.icon}
        </div>
        <h1 className="text-5xl font-bold mb-4 mt-1 ml-5">{props.title}</h1>
      </div>
    </section>
  );
}