import { useAppDispatch, useAppSelector } from "../../../Redux/Hooks"

function CurrentProgramDisplayer(){
    const dummyUrl: string = 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxM[…]dlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3269&q=80';
    return (
        <div>
            <img
                src={dummyUrl}
                alt={"Image of current program"}
                className="w-80 h-24 rounded-lg mx-auto object-cover object-top overflow-hidden"
            />
        </div>
    )
}

export default CurrentProgramDisplayer