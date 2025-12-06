export function Subtitle(props) {
  return (
    <section className=" text-cyan-600 font-semibold italic uppercase">
      <div className="flex mx-auto text-center justify-center gap-3">
        {props.icon}
        <h1 className="text-3xl font-bold mb-6">{props.Subtitle}</h1>
      </div>
    </section>
  );
}