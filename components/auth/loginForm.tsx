import React from 'react';
import Input from './input';
import Link from 'next/link';
import Button from '../shared/button';

interface LoginFormProps {
  label: string;
  buttonLink: string;
  password?: boolean;
  login?: boolean;
}

const LoginForm = ({ label, buttonLink, password = false, login = true }: LoginFormProps) => {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="p-[40px] flex flex-col gap-[40px] bg-fillLightBgLightContr rounded-[25px]">
      <h1 className="text-[40px] font-semibold leading-[100%]">{label}</h1>
      <div className="w-[442px] flex flex-col gap-[30px]">
        <div className="flex flex-col w-full gap-[20px]">
          {login ? (
            <Input label="Логин" id="login" placeholder="Введите свой логин" type="text" />
          ) : null}
          {password ? (
            <Input label="Пароль" id="password" placeholder="Введите свой пароль" type="password" />
          ) : null}
        </div>
        <Button buttonLink={buttonLink} size="small">
          Войти
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
