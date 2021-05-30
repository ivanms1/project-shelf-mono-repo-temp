import Select from 'react-select';

const colourStyles = {
  indicatorSeparator: (base: any) => ({
    ...base,
    display: 'none',
  }),
  menuList: (base: any) => ({
    ...base,
    '::-webkit-scrollbar': {
      width: '5px',
    },
    '::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#888',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
    cursor: 'pointer',
  }),
  control: (styles: any) => ({
    ...styles,
    backgroundColor: 'white',
    width: '170px',
    cursor: 'pointer',
  }),
  menu: ({ width, ...css }: any) => ({
    ...css,
    width: '170px',
    cursor: 'pointer',
  }),
  option: (css: any, state: any) => ({
    ...css,
    margin: '5px',
    padding: '4px 12px',
    cursor: 'pointer',
    maxWidth: '150px',
    borderRadius: '5px',
    fontSize: '15px',
    color: state.isSelected ? 'white' : '#7d889f',
    fontWeight: '400',

    ':hover': {
      backgroundColor: '#edf1f5',
      color: '#54b6f2',
      transition: '0.2s linear',
    },
  }),
};

const titleStyle = {
  color: '#516170',
  fontWeight: 500,
};

function SearchWithYear({ options, onChange, title = 'Year' }: any) {
  return (
    <div>
      <span style={titleStyle}>{title}</span>
      <Select
        styles={colourStyles}
        placeholder="Any"
        options={options}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchWithYear;
