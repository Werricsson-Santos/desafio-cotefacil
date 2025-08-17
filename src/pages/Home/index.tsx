import { Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Header, Title, Subtitle} from './styles';

export const Home: React.FC = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        p: 2,
      }}
    >
      <Header>
        <Title>Bem-vindo ao Portfólio</Title>
        <Subtitle>
          Selecione uma das aplicações no menu acima <MenuIcon sx={{ mx: 0.75, color: 'success.main', fontSize: '1.25rem', verticalAlign: 'middle'}} /> para começar a explorar.
        </Subtitle>
      </Header>
    </Box>
  );
};