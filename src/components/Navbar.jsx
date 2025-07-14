import { Email, navList } from "../constants"

const Navbar = () => {
  return (
    <header className="fixed left-1/2 top-0 -translate-x-1/2 h-[70px] w-full md:w-11/12 max-w-8xl flex justify-between items-center px-2 md:px-8 py-3 my-2 md:my-3 left bg-black bg-opacity-10 z-20 backdrop-blur-sm rounded-lg">
            <nav className="h-full w-full flex justify-between items-center">
                <div className="px-3">
                    <h1 className="text-3xl md:text-2xl text-white font-popins font-extralight relative">
                        <span className="relative z-10">Geo</span>
                        <span className="absolute -top-1 -right-1 text-xs text-amber-400 font-bold transform rotate-12">
                            EST.
                        </span>
                        <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 rounded-full"></span>
                        <span className="absolute -bottom-3 left-1 right-1 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent rounded-full opacity-60"></span>
                    </h1>
                </div>
                <div className=" hidden md:flex h-full gap-6 lg:gap-0 w-1/3 justify-evenly items-center">
                    {navList.map((nav, i) =>(
                        <div key={i} className="text-lg text-white cursor-pointer hover:text-gray-400 transition-all">
                           <a href={nav.link} target="_blank">{ nav.name }</a>
                        </div> 
                    ))}
                </div>
                <div className="hidden md:flex text-base items-center text-white cursor-pointer hover:text-gray-400 transition-all">
                  <a href="mailto:reubengeoffrey16@gmail.com" target="_blank">{ Email.mailId }</a>
                </div>
                <div className="flex md:hidden h-full w-[150px] justify-evenly items-center">
                    {navList.map((nav, i) =>(
                        <div key={i} className=" min-h-[22px] min-w-[22px] ">
                           <a href={nav.link} target="_blank"><img className="h-[22px] w-[22px] object-contain " src={nav.logo } alt="" /></a>
                        </div> 
                    ))}                        
                    <a href="mailto:reubengeoffrey16@gmail.com" target="_blank"><img className="h-[22px] w-[22px] object-contain" src={ Email.mailIcon } alt="" /></a>
                </div>
                
            </nav>
    </header>
  )
}

export default Navbar