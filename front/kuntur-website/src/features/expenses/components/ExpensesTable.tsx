// <section
//         aria-label="Expenses table"
//         className="flex flex-row justify-center pb-28"
//       >
//         <div className="w-full relative overflow-auto border-[1px] border-[#00000014] rounded-2xl">
//           <table className="w-full table-auto rounded-2xl border-separate border-spacing-0 text-sm text-[#212529] border-collapse">
//             <thead>
//               <tr className="bg-[#f5f5f5] border-b border-[#dee2e6] text-left">
//                 {/* <th className="w-1/12 font-medium text-sm text-[#495057] pl-4">
//                 Monto
//               </th>
//               <th className="font-medium text-sm text-[#495057]">
//                 Descripción
//               </th>
//               <th className="font-medium text-sm text-[#495057]">
//                 Categoría
//               </th>
//               <th className="font-medium text-sm text-[#495057]">
//                 Subcategoría
//               </th>
//               <th className="w-1/12 font-medium text-sm text-[#495057] p-4">
//                 Fecha
//               </th>
//               <th className="w-1/24 font-medium text-sm text-[#495057] text-right pr-4">
//                 Delete
//               </th> */}
//               </tr>
//             </thead>

//             <tbody>
//               {filteredExpenses.map((e, index) => {
//                 const isGrayRow = index % 2 === 0
//                 const isLast = index === filteredExpenses.length - 1
//                 return (
//                   <tr
//                     key={index}
//                     className={` h-18 transition-all duration-200 text-left hover:-translate-y-[1px] hover:bg-[#f8f9fa]   ${
//                       isGrayRow ? 'bg-white ' : 'bg-white'
//                     } `}
//                   >
//                     <td
//                       className={` text-left pl-2 md:pl-6 font-medium  ${!isLast ? 'border-b-[1px] border-[#00000014]' : ''}`}
//                     >
//                       <span className="flex items-center gap-2 text-[black]">
//                         <span className="w-2 h-2 rounded-full bg-[#E53935] flex-none tracking-tight"></span>
//                         {/* Amount */}
//                         {`S/ ${centsToDecimal(e.amount)}`}
//                       </span>
//                     </td>
//                     <td
//                       className={`${!isLast ? 'border-b-[1px] border-[#00000014]' : ''} truncate font-bold`}
//                     >
//                       <div className="flex items-center justify-start truncate">
//                         {e.description || (
//                           <span className="text-gray-400 italic">
//                             Sin descripción
//                           </span>
//                         )}
//                       </div>
//                     </td>
//                     <td
//                       className={`${!isLast ? 'border-b-[1px] border-[#00000014]' : ''} truncate `}
//                     >
//                       <div className="flex flex-col gap-1">
//                         <div className="flex items-center justify-center gap-1 bg-[#0E9053]/15 rounded-lg p-1 md:p-2 text-xs font-bold text-[#1F3B2E] w-fit truncate">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="16"
//                             height="16"
//                             fill="#000000"
//                             viewBox="0 0 256 256"
//                           >
//                             <path d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z"></path>
//                           </svg>
//                           {e.category || (
//                             <span className="text-gray-400 italic ">
//                               Sin categoría
//                             </span>
//                           )}
//                         </div>

//                         <div className="flex items-center gap-1 p-1 md:p-2 bg-[#0E9053]/8 text-xs font-bold text-[#1F3B2E] truncate rounded-lg w-fit md:hidden">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="16"
//                             height="16"
//                             fill="#000000"
//                             viewBox="0 0 256 256"
//                           >
//                             <path d="M72,60A12,12,0,1,1,60,48,12,12,0,0,1,72,60Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,128,48Zm68,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,128,116Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,184a12,12,0,1,0,12,12A12,12,0,0,0,60,184Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,128,184Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,196,184Z"></path>
//                           </svg>
//                           {e.subcategory || (
//                             <span className=" text-gray-400 italic">
//                               Sin subcategoría
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </td>
//                     {/* Subcategoria */}
//                     <td
//                       className={`${!isLast ? 'border-b-[1px] border-[#00000014]' : ''} `}
//                     >
//                       <div className="hidden md:flex items-center gap-1 p-2 bg-[#0E9053]/8 text-xs font-bold text-[#1F3B2E] truncate rounded-lg w-fit">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="16"
//                           height="16"
//                           fill="#000000"
//                           viewBox="0 0 256 256"
//                         >
//                           <path d="M72,60A12,12,0,1,1,60,48,12,12,0,0,1,72,60Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,128,48Zm68,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,128,116Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,184a12,12,0,1,0,12,12A12,12,0,0,0,60,184Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,128,184Zm68,0a12,12,0,1,0,12,12A12,12,0,0,0,196,184Z"></path>
//                         </svg>
//                         {e.subcategory || (
//                           <span className=" text-gray-400 italic">
//                             Sin subcategoría
//                           </span>
//                         )}
//                       </div>
//                     </td>
//                     {/* <td
//                       className={`w-1/8 ${!isLast ? 'border-b-[1px] border-[#00000014]' : ''} p-4 text-[#666666] text-sm hidden md:flex`}
//                     >
//                       {formatDate(e.date)}
//                     </td> */}
//                     <td
//                       className={`w-1/8 ${!isLast ? 'border-b-[1px] border-[#00000014]' : ''} p-4 text-[#666666] text-sm truncate`}
//                     >
//                       {formatDate(e.date)}
//                     </td>

//                     <td
//                       className={`${!isLast ? 'border-b-[1px] border-[#00000014]' : ''} text-right pr-2 md:pr-6 font-medium text-[#dc3545] `}
//                     >
//                       <button
//                         className="cursor-pointer"
//                         onClick={async () => {
//                           if (!confirm('¿Eliminar este gasto?')) return

//                           const id = e.id

//                           setExpenseHistory((prev) =>
//                             prev.filter((exp) => exp.id !== id),
//                           )

//                           if (!String(id).startsWith('demo')) {
//                             try {
//                               await deleteExpense(id!)
//                             } catch (error) {
//                               alert('Error eliminando gasto')

//                               setExpenseHistory((prev) => [...prev, e])
//                             }
//                           }
//                         }}
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="17"
//                           height="17"
//                           fill="#000000"
//                           viewBox="0 0 256 256"
//                         >
//                           <path d="M216,48H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM192,208H64V64H192ZM80,24a8,8,0,0,1,8-8h80a8,8,0,0,1,0,16H88A8,8,0,0,1,80,24Z"></path>
//                         </svg>
//                       </button>
//                     </td>
//                   </tr>
//                 )
//               })}
//             </tbody>
//           </table>
//           <div ref={tableEndRef} />
//         </div>
//       </section>
