import Link from 'next/link';
interface ButttonProps {
  size: 'small' | 'big';
  buttonLink: string;
  children: React.ReactNode;
}
const Button = ({ buttonLink, size = 'small', children }: ButttonProps) => {
  return (
    <Link
      href={buttonLink}
      className={`${
        size === 'small' ? 'py-3' : 'py-5'
      } px-4 bg-fillButtonAccentDefault text-center rounded-xl w-full text-[18px] text-white font-medium leading-[150%]`}>
      {children}
    </Link>
  );
};

export default Button;
