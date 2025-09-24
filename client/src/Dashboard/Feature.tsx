import {type ReactNode} from 'react'

type FeatureProps = {
    icon: ReactNode,
    name: String,
    purpose: String,
    description: Array<String>,
}

const Feature:React.FC<FeatureProps>= ({icon, name, purpose, description}) => {
    return(
        <div className="p-8 bg-white rounded-2xl shadow-lg text-center space-y-6 transition-transform transform hover:scale-105 duration-300 w-full mx-auto">
            <div className="flex items-center justify-center gap-2">
                {icon}
                <h2 className="text-xl font-bold">{name}</h2>
            </div>
            <p>{purpose}</p>
            <ul className="flex flex-col gap-2">
                {description.map((item) => {
                    return(
                        <li className="flex items-start gap-2">
                            <span className="text-green-700 mr-2">&#10003;</span>
                            {item}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Feature