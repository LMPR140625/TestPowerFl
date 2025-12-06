export function HeroSection(props) {
  return (
    <section className="rounded-full bg-linear-to-r/decreasing from-black to-cyan-500 text-white py-20" data-aos="fade-rigth">
      <div className="container mx-auto text-center" >
        <div className="">
          {props.icon}
        </div>
        <h1 className="text-5xl font-bold mb-4 ">{props.title}</h1>
        <p className="text-2xl mb-8 ">
          {props.description}
        </p>
      </div>
      
    </section>
  );
}