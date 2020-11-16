import React from "react";
import ReactDOM from "react-dom";

import "./App.css";

const App = () => {
  const [data, dataSet] = React.useState({});
  const [columns, columnsSet] = React.useState([]);
  React.useEffect(() => {
    chrome.runtime.sendMessage(
      {
        type: "performance:metrics:request",
      },
      (d) => {
        dataSet(d);
        const keys = {};
        Object.values(d).forEach((val) => {
          Object.keys(val).forEach((k) => (keys[k] = true));
        });
        columnsSet(Object.keys(keys));
      }
    );
  }, []);
  return (
    <div>
      <h1>Page ranks</h1>
      <table width="100%">
        <thead>
          <tr>
            <th width="20%"></th>
            {columns.map((k) => (
              <th width={`${80 / columns.length}%`} key={k}>
                {k}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((url) => (
            <tr key={url}>
              <td
                style={{
                  textOverflow: "ellipsis",
                }}
                width="20%"
                noWrap
              >
                {url.slice(0, 30)}
              </td>
              {columns.map((k) => (
                <td key={[url, k].join(":")} width="20%">
                  {Math.round((data[url][k] || { average: 0 }).average)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
