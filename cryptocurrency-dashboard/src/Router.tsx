import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/cryptocurrency-dashboard/:coinId">
          <Coin
            id={""}
            name={""}
            symbol={""}
            rank={0}
            is_new={false}
            is_active={false}
            type={""}
          />
        </Route>
        <Route path="/cryptocurrency-dashboard/">
          <Coin
            id={""}
            name={""}
            symbol={""}
            rank={0}
            is_new={false}
            is_active={false}
            type={""}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
