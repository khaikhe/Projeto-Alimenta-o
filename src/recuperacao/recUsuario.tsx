import './global.css';
import { useState } from 'react'
import {useForm } from 'react-hook-form'
import './App.css'
import { z } from 'zod'
// "zod" faz as validaçoes do usuario
import { zodResolver } from '@hookform/resolvers/zod';
const createUserFormSchema = z.object({  //validação principal

  nome: z.string().nonempty('O nome é obrigatório')
  .transform(name =>{
    return name.trim().split(' ').map(word=>{
      return word[0].toLocaleUpperCase().concat(word.substring(1))//faz o nome do usuario altomaticamente ficar com letra maiuscula na primeira letra
    }).join(' ')
  }),

  email: z.string()
  .nonempty('O e-mail é obrigatório')
  .email('Formato de e-mail inválido')
  .toLowerCase(),
  password: z.string()
  .min(6, 'A senha deve ter no minimo 6 caracteres') .refine((value) => {
    const hasNumber = /\d/.test(value);
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_,.?":{}|<>]/.test(value);
    return hasNumber && hasLetter && hasSpecialChar;
  }, 'A senha deve conter números, letras e caracteres especiais'),
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>


export function App() {
  const [] = useState(0)
  const {register, handleSubmit, formState:{ errors } }
   = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  }) //registra os dados do usuario
  

 const [output, setOutput] =useState('')
 function createUser(data: any){
    setOutput(JSON.stringify(data, null, 2))
    console.log(data)
  }

  return (
     <main className="h-screen bg-zinc-50 felx items-center justify-center">
<form 
onSubmit={handleSubmit(createUser)}
className='flex flex-col gap-6 w-full max-w-xs'
>
  <div className="flex flex-col gap-2">   
  <label htmlFor="">E-mail</label>
  <input 
   type="email"
   className='border border-zinc-600 shadow-sm rounded-full h-12 px-3'
   {...register('email')}
   />
   {errors.email && <span>{errors.email.message}</span>}
</div>

<button type='submit'
className='bg-emerald-800 rounded-full font-normal text-white h-12 hover:bg-emerald-700'
>Entrar</button>
</form>
<pre> {output}</pre>
     </main>
      
  );
}

export default App