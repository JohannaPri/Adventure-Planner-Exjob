import { Image } from "./Image";
import { AirplaneTilt, House, Mountains, Sun } from "@phosphor-icons/react";

type CardProps = {
  cardClass: string;
  imageWrapperClass: string;
  imageAlt: string;
  imageSrc: string;
  icon?: string;
  textWrapperClass?: string;
  cover?: string;
  children?: React.ReactNode;
};

export const Card = ({
  cardClass,
  imageWrapperClass,
  imageAlt,
  imageSrc,
  icon,
  textWrapperClass,
  children,
  cover,
  ...rest
}: CardProps) => {
  return (
    <div className={cardClass} {...rest}>
      {icon ? (
        icon === "airplane" ? (
          <AirplaneTilt size={32} />
        ) : icon === "house" ? (
          <House size={32} />
        ) : icon === "mountains" ? (
          <Mountains size={32} />
        ) : icon === "sun" ? (
          <Sun size={32} />
        ) : null
      ) : (
        <Image
          className={imageWrapperClass}
          objectCover={cover}
          alt={imageAlt}
          image={imageSrc}
        />
      )}
      <div className={textWrapperClass}>{children}</div>
    </div>
  );
};
