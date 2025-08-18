import { Box, Container, Typography, Link, IconButton, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        px: 2,
        mt: 'auto',
        backgroundColor: 'rgba(18, 18, 20, 0.7)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)'
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            {'Feito com ❤️ por '}
            <Link color="inherit" href="https://www.linkedin.com/in/werricsson-santos/">
              Werricsson Santos
            </Link>
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton
              aria-label="GitHub"
              component="a"
              href="https://github.com/werricsson-santos"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                color: '#bdbdbd', // Um cinza claro para manter a neutralidade
                '&:hover': {
                  color: 'white', // Fica branco ao passar o mouse
                } 
              }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              aria-label="LinkedIn"
              component="a"
              href="https://www.linkedin.com/in/werricsson-santos/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                color: '#0A66C2', // Cor oficial do LinkedIn
                '&:hover': {
                  color: '#0058a3', // Um tom mais escuro para o hover
                }
              }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              aria-label="WhatsApp"
              component="a"
              href="https://wa.me/5514996280519"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                color: '#25D366', // Cor oficial do WhatsApp
                '&:hover': {
                  color: '#1ebe58', // Um tom mais escuro para o hover
                }
              }}
            >
              <WhatsAppIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};