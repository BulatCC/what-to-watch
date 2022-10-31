import { ButtonFontSize } from '../../consts';

type btnSize = typeof ButtonFontSize.MD | typeof ButtonFontSize.SM;

type ButtonBigProps = {
    title: string;
    clickHandler: () => void;
    btnCssClass: string;
};

const ButtonBig = ({ title, btnCssClass, clickHandler }: ButtonBigProps): JSX.Element => {
    return (
        <button className={btnCssClass} onClick={clickHandler} type="button">{title}</button>
    )
}

export { ButtonBig };