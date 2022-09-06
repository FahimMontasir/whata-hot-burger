import { Icon } from "@iconify/react";
import googleFill from "@iconify/icons-eva/google-fill";
import github from "@iconify/icons-eva/github-fill";
import linkedinFill from "@iconify/icons-eva/linkedin-fill";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Grid,
  Link,
  Container,
  Typography,
  IconButton,
  Stack,
  styled,
} from "@mui/material";
// routes
import { PATH_PAGE } from "../routes/paths";
//
import Logo from "../common/Logo";

const SOCIALS = [
  {
    name: "Github",
    icon: github,
    link: "https://github.com/FahimMontasir",
  },
  { name: "Google", icon: googleFill, link: "https://moontasir.web.app/" },
  {
    name: "Linkedin",
    icon: linkedinFill,
    link: "https://www.linkedin.com/in/fahim-montasir/",
  },
];

const LINKS = [
  {
    headline: "WHB",
    children: [
      { name: "About us", href: PATH_PAGE.aboutUs },
      { name: "Contact us", href: PATH_PAGE.aboutUs },
      { name: "FAQs", href: PATH_PAGE.faq },
    ],
  },
  {
    headline: "Legal",
    children: [
      { name: "Terms and Condition", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
  {
    headline: "Contact",
    children: [
      { name: "fahimmontasirshakil@gmail.com", href: "#" },
      { name: "Dhaka, Bangladesh", href: "#" },
    ],
  },
];

const RootStyle = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.background.default,
}));

export default function MainFooter() {
  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{ xs: "center", md: "space-between" }}
          sx={{ textAlign: { xs: "center", md: "left" } }}
        >
          <Grid item xs={12} sx={{ mb: 3 }}>
            <ScrollLink to="move_top" spy smooth>
              <Logo sx={{ mx: { xs: "auto", md: "inherit" } }} />
            </ScrollLink>
          </Grid>
          <Grid item xs={8} md={3}>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              Everything is hot and spicy!!!
            </Typography>

            <Stack
              spacing={1.5}
              direction="row"
              justifyContent={{ xs: "center", md: "flex-start" }}
              sx={{ mt: 5, mb: { xs: 5, md: 0 } }}
            >
              {SOCIALS.map((social) => (
                <IconButton
                  href={social.link}
                  target="_blank"
                  key={social.name}
                  color="primary"
                  sx={{ p: 1 }}
                >
                  <Icon icon={social.icon} width={16} height={16} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack
              spacing={5}
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
            >
              {LINKS.map((list) => {
                const { headline, children } = list;
                return (
                  <Stack key={headline} spacing={2}>
                    <Typography component="p" variant="overline">
                      {headline}
                    </Typography>
                    {children.map((link) => (
                      <Link
                        to={link.href}
                        key={link.name}
                        color="inherit"
                        variant="body2"
                        component={RouterLink}
                        sx={{ display: "block" }}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </Stack>
                );
              })}
            </Stack>
          </Grid>
        </Grid>

        <Typography
          component="p"
          variant="body2"
          sx={{
            mt: 10,
            pb: 5,
            fontSize: 13,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          © 2022. All rights reserved by{" "}
          <a href="https://moontasir.web.app/" rel="noreferrer" target="_blank">
            Fahim Montasir
          </a>
        </Typography>
      </Container>
    </RootStyle>
  );
}
