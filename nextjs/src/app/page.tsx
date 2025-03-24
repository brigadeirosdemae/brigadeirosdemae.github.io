import IframeSite from "./iframe"

export default function Home() {
  return (
    <div className={"flex justify-start flex-col items-center w-screen h-screen"}>

      <div className="flex p-0 mt-4">
        <img src="/images/logo.png" />
      </div>

      <div className={"flex flex-row gap-4"}>
        <a href="https://api.whatsapp.com/send?phone=5511954987213&text=Ola, gostaria de saber sobre " target={"_blank"}>
          <img src="/images/whatsapp.png" className="w-12 h-12"/>
        </a>
        <a href="https://www.instagram.com/brigadeirosdemaedoces" target={"_blank"}>
          <img src="/images/instagram.png" className="w-12 h-12"/>
        </a>
      </div>

      <div>
        <a href="#cardapio" className="block font-semibold mt-8"> Cardápio </a>
      </div>

      <div id="cardapio">
        <IframeSite />
      </div>

    </div>
  );
}
