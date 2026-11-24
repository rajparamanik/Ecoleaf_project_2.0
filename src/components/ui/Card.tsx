import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card = ({ children, className = '', onClick, hoverable = false }: CardProps) => {
  return (
    <div 
      className={`
        overflow-hidden bg-white rounded-lg shadow-sm 
        ${hoverable ? 'transition-all hover:shadow-md hover:-translate-y-1' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

const CardImage = ({ src, alt, className = '' }: CardImageProps) => (
  <div className={`relative overflow-hidden ${className}`}>
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </div>
);

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

const CardBody = ({ children, className = '' }: CardBodyProps) => (
  <div className={`p-5 ${className}`}>{children}</div>
);

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

const CardTitle = ({ children, className = '' }: CardTitleProps) => (
  <h3 className={`text-xl font-semibold mb-2 ${className}`}>{children}</h3>
);

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

const CardFooter = ({ children, className = '' }: CardFooterProps) => (
  <div className={`px-5 py-4 bg-gray-50 border-t border-gray-100 ${className}`}>{children}</div>
);

Card.Image = CardImage;
Card.Body = CardBody;
Card.Title = CardTitle;
Card.Footer = CardFooter;

export default Card;