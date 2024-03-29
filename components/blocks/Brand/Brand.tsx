import Link from "next/link";
import styled from "styled-components";

const LogoLink = styled(Link)`
  cursor: pointer;
`;

type BrandProps = {
  mode?: "vertical" | "horizontal";
};

export const Brand = ({ mode = "horizontal" }: BrandProps) => {
  return (
    <div className="menu-logo">
      <LogoLink href="/">
        <a>
          <img
            src={
              mode === "horizontal"
                ? "/images/logo313.png"
                : "/images/logo313.png"
            }
            alt="Logo"
          />
        </a>
      </LogoLink>
    </div>
  );
};
