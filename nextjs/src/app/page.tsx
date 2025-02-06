export default function Home() {
  return (
    <div className={"flex justify-center flex-col items-center w-screen h-screen"}>
      <div className="flex">
        <img src="/images/logo.png" />
      </div>

      <div className={"flex"}>
        <img src="/images/construction-image.png" />
        <div className={"flex justify-center flex-col gap-4 p-8"}>
          <a href="https://brigadeirosdemaedoces.goomer.app/" target={"_blank"}>
            <img src="/images/goomer.png" />
          </a>
          <a href="https://api.whatsapp.com/send?phone=5511954987213&text=Ola, gostaria de saber sobre " target={"_blank"}>
            <img src="/images/whatsapp.png" />
          </a>
          <a href="https://www.instagram.com/brigadeirosdemaedoces" target={"_blank"}>
            <img src="/images/instagram.png" />
          </a>
        </div>
      </div>

      <div className={"text-white"}>
        <p className="text-center uppercase text-2xl mt-16">
          Nosso site está em construção, <br />
          mas estamos também <br />
          nos canais
        </p>
      </div>
    </div>
  );
}
