import { Link } from "react-router-dom";

export default function TaskCard({ props }) {
  return (
    <Link to={"/tasks/" + props.key} className="text-decoration-none">
        <div className="bg-green-400">
            <div className="card mt-3 shadow-sm">
                <div className="card-body text-black">{props.title}
                </div>
            </div>
        </div>
    </Link>
  )
}