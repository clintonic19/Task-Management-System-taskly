import 'react'
import clsx from 'clsx'


const Title = ({title, className}) => {
  return (
    <>
    <h1 className={clsx("text-2xl font-semibold capitalize", className)}>
        {title}
    </h1>
    
    </>
  )
}

export default Title
