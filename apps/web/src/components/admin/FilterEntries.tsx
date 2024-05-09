import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { axiosInstance } from '@/axios/axios';
interface Entry {
  id: string;
  name: string;
}
interface FilterEntriesProps {
  selector: string;
  setProductId: Function;
  setCategoryId: Function;
}
const FilterEntriesComponent: React.FC<FilterEntriesProps> = ({
  selector,
  setProductId,
  setCategoryId,
}) => {
  if (selector) {
    const [entries, setEntries] = React.useState<Entry[]>([]);
    const fetchEntries = () => {
      const endpoint =
        selector === 'category' ? 'summaries/v11' : 'summaries/v10';
      axiosInstance()
        .get(endpoint)
        .then((res) => {
          setEntries(res.data.result);
        })
        .catch((err) => console.log(err));
    };
    React.useEffect(() => {
      fetchEntries();
    }, [selector]);
    const entriesList = entries.map((entry) => ({
      label: entry.name,
      value: entry.id,
    }));
    const handleChange = (
      event: React.SyntheticEvent,
      value: { label: string; value: string } | null,
    ) => {
      if (value) {
        if (selector === 'category') {
          setCategoryId(value.value);
          setProductId('');
        } else {
          setProductId(value.value);
          setCategoryId('');
        }
      }
    };
    return (
      <Autocomplete
        disablePortal
        options={entriesList}
        sx={{ width: 300 }}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={selector == 'category' ? 'Category' : 'Product'}
          />
        )}
      />
    );
  }
};
export default FilterEntriesComponent;
