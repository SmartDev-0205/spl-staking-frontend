import { Icon } from "@iconify/react";
import Container from "../components/containers/Container";
import TextIconButton from "../components/buttons/TextIconButton";

export default function Footer() {
  return (
    <footer className="bg-[#113300] border-t border-gray-900">
      <Container className="hidden lg:flex justify-between items-center my-4">
        <div className="flex items-center gap-2">
          {/* <span className="text-gray-600">Audited by:</span> */}
        </div>

        <span className="text-gray-200">
          Copyrights © {new Date().getFullYear()} Frogo Coin
        </span>

        <div className="flex items-center gap-2">
          <a href="https://discord.com/channels/1057939096527437845/1077913470479106048">
            <TextIconButton>
              <Icon icon="ic:baseline-discord" className="text-2xl" />
            </TextIconButton>
          </a>
          <a href="https://t.me/Ridgebackinnu">
            <TextIconButton>
              <Icon icon="mdi:telegram" className="text-2xl" />
            </TextIconButton>
          </a>
        </div>
      </Container>

      <Container className="flex lg:hidden flex-col my-0">
        <p className="text-gray-200 text-center">
          Copyrights © {new Date().getFullYear()} Frogo Coin
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Audited by:</span>
          </div>
          <div className="flex items-center gap-2">
            <TextIconButton>
              <Icon icon="ic:baseline-discord" className="text-2xl" />
            </TextIconButton>
            <TextIconButton>
              <Icon icon="mdi:twitter" className="text-2xl" />
            </TextIconButton>
          </div>
        </div>
      </Container>
    </footer>
  );
}
