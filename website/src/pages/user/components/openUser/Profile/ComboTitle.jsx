import { Box, CircularProgress, Stack } from "@mui/material";
import Label from "../../../../../common/Label";
import { useGetComboQuery } from "../../../../../store/redux/api/combo";

function ComboTitle({ id }) {
  const { data, isSuccess, isLoading } = useGetComboQuery(id);
  return (
    <Stack my={1} direction="row" spacing={2}>
      {isLoading && <CircularProgress size={20} />}
      {isSuccess && (
        <>
          <Box
            width={20}
            height={20}
            borderRadius="5px"
            component="img"
            src={data.object.photoUrls[0]}
          />
          <Label>{data.object.category}</Label>
        </>
      )}
    </Stack>
  );
}

export default ComboTitle;
