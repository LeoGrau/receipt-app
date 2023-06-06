import { createContext, useState } from "react";


import PropTypes from "prop-types";

const PrintContext = createContext();

function PrintProvider ({children}) {
  
  const [printData, setPrintData] = useState();

  const updatePrintData = (newValue) => {
    setPrintData(newValue);
  }

  return (
    <PrintContext.Provider value={{ printData, updatePrintData }}>
      {children}
    </PrintContext.Provider>
  );
}

PrintProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { PrintContext, PrintProvider }

// ReceiptCard.propTypes = {
//   receipt: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     // Add more prop types for other receipt properties if needed
//   }).isRequired,
//   onEvent: PropTypes.func.isRequired,
// };

