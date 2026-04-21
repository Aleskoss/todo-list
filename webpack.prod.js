import common from "./webpack.common.js";
import { merge } from "webpack-merge";
import CssMinimzerPlugin from "css-minimizer-webpack-plugin";

export default merge(common, {
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimizer: [new CssMinimzerPlugin()],
  },
});
