import { Routes, Route } from "react-router-dom";
import { Tickets } from "./tickets";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Tickets />} />
                {/* <Route path="/:id" element={<TicketDetail />} /> */}
            </Routes>
        </div>
    );
};

export default App;
