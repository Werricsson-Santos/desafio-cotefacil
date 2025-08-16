import logoAsset from '../../assets/cotefacil.png';
import { LogoBackground, LogoImage, LogoLink } from './styles';

export function Logo() {
  return (
    <LogoLink to="/">
      <LogoBackground>
        <LogoImage src={logoAsset} alt="Cotefácil Logo" />
      </LogoBackground>
    </LogoLink>
  );
}