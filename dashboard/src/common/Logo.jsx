import PropTypes from "prop-types";
// material
import { useTheme, Box } from "@mui/material";

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo({ sx }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  return (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        x="0px"
        y="0px"
        viewBox="0 0 320 320"
        xmlSpace="preserve"
      >
        <g id="XMLID_813_">
          <path
            id="XMLID_814_"
            fill="#FFAD41"
            d="M300,159.355v-20C300,84.483,255.518,40,200.645,40h-81.29
		C64.482,40,20,84.483,20,139.355v20H300z"
          />
          <path
            id="XMLID_815_"
            fill="#FF9811"
            d="M160,40h-40.645C64.482,40,20,84.483,20,139.355v20h140V40z"
          />
          <circle id="XMLID_816_" fill={PRIMARY_MAIN} cx="70" cy="110" r="10" />
          <circle
            id="XMLID_817_"
            fill={PRIMARY_LIGHT}
            cx="120"
            cy="80"
            r="10"
          />
          <circle
            id="XMLID_818_"
            fill={PRIMARY_MAIN}
            cx="250"
            cy="110"
            r="10"
          />
          <circle id="XMLID_819_" fill={PRIMARY_DARK} cx="200" cy="80" r="10" />
          <circle
            id="XMLID_820_"
            fill={PRIMARY_MAIN}
            cx="160"
            cy="110"
            r="10"
          />
          <path
            id="XMLID_821_"
            fill="#804C09"
            d="M160,100c-5.523,0-10,4.477-10,10s4.477,10,10,10"
          />
          <path
            id="XMLID_822_"
            fill="#FF5023"
            d="M270,170H50c-16.568,0-30,13.432-30,30s13.432,30,30,30h220
		c16.568,0,30-13.432,30-30S286.568,170,270,170z"
          />
          <path
            id="XMLID_823_"
            fill="#BD3C1A"
            d="M160,170H50c-16.568,0-30,13.432-30,30s13.432,30,30,30h110V170z"
          />
          <path
            id="XMLID_824_"
            fill="#FFAD41"
            d="M320,250c0,16.568-13.432,30-30,30H30c-16.568,0-30-13.432-30-30l0,0
		c0-16.568,13.432-30,30-30h260C306.568,220,320,233.432,320,250L320,250z"
          />
          <path
            id="XMLID_825_"
            fill="#FF9811"
            d="M160,220H30c-16.568,0-30,13.432-30,30s13.432,30,30,30h130V220z"
          />
          <polygon
            id="XMLID_826_"
            fill={PRIMARY_MAIN}
            points="60,180 160,170 260,180 160,250 	"
          />
          <polygon
            id="XMLID_827_"
            fill={PRIMARY_MAIN}
            points="60,180 160,170 160,250 	"
          />
          <path
            id="XMLID_828_"
            fill="#91DC5A"
            d="M320,165c0,8.284-6.716,15-15,15H15c-8.284,0-15-6.716-15-15l0,0
		c0-8.284,6.716-15,15-15h290C313.284,150,320,156.716,320,165L320,165z"
          />
          <path
            id="XMLID_829_"
            fill="#64C37D"
            d="M160,150H15c-8.284,0-15,6.716-15,15s6.716,15,15,15h145V150z"
          />
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>
    </Box>
  );
}
