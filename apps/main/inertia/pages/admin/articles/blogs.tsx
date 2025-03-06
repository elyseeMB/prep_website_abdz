export default function viewBlogs() {
  return (
    <div className="relative w-full">
      <article className="relative w-full h-auto grid grid-row-start-1 grid-row-end-auto shadow-[0_0_0_1px_rgba(237,239,242,1),0_0_2px_0_rgba(0,0,0,0.12)] rounded-8px m-1px">
        <div>
          <div className="w-full h-auto relative before:content-empty before:absolute before:bg-[linear-gradient(90deg,#ffffff_19.93%,transparent_100%)] before:w-20px before:pos-top-6px before:pos-bottom-0 before:z-2 before:h-[calc(100%-6px)] before:rounded-[0_0_0_8px] after:content-empty after:absolute after:bg-[linear-gradient(90deg,transparent_0%,#ffffff_80.05%)] after:w-20px after:pos-top-6px after:pos-right-0 after:pos-bottom-0 after:z-2 after:h-[calc(100%-6px)] after:rounded-[0_0_8px]">
            <div className="relative rounded-8px table  w-full overflow-hidden">
              <table className="relative w-full text-left rounded-lg overflow-hidden text-14px text-black/60 table-padding">
                <thead
                  className="relative z-1 shadow-[0_0_0_1px_rgba(25,28,33,0.06),0_1px_2px_0_rgba(25,28,33,0.12),0_0_2px_0_rgba(0,0,0,0.08)] 
            p-4 rounded-lg bg-white font-500"
                >
                  <tr>
                    <th>Nom</th>
                    <th>Âge</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border border-b-[rgb(237,239,242)] hover:bg-gray-100/50">
                    <td>Alice</td>
                    <td>25</td>
                    <td>alice@email.com</td>
                  </tr>
                  <tr className="border-b border border-b-[rgb(237,239,242)] hover:bg-gray-100/50">
                    <td>Bob</td>
                    <td>30</td>
                    <td>bob@email.com</td>
                  </tr>
                  <tr className="border-b border border-b-[rgb(237,239,242)] hover:bg-gray-100/50">
                    <td>Charlie</td>
                    <td>28</td>
                    <td>charlie@email.com</td>
                  </tr>
                  <tr className="border-b border border-b-[rgb(237,239,242)] hover:bg-gray-100/50">
                    <td>David</td>
                    <td>22</td>
                    <td>david@email.com</td>
                  </tr>
                  <tr className="border-b border border-b-[rgb(237,239,242)] hover:bg-gray-100/50">
                    <td>Eva</td>
                    <td>35</td>
                    <td>eva@email.com</td>
                  </tr>
                  <tr className="border-b border border-b-[rgb(237,239,242)] hover:bg-gray-100/50">
                    <td>Frank</td>
                    <td>40</td>
                    <td>frank@email.com</td>
                  </tr>
                  <tr className="border-b border border-b-[rgb(237,239,242)] hover:bg-gray-100/50">
                    <td>Grace</td>
                    <td>27</td>
                    <td>grace@email.com</td>
                  </tr>
                  <tr className="border-b border border-b-[rgb(237,239,242)] hover:bg-gray-100/50">
                    <td>Hank</td>
                    <td>32</td>
                    <td>hank@email.com</td>
                  </tr>
                  <tr className="border-b border border-b-[rgb(237,239,242)] hover:bg-gray-100/50">
                    <td>Isla</td>
                    <td>29</td>
                    <td>isla@email.com</td>
                  </tr>
                  <tr className="border-b border border-b-[rgb(237,239,242)] hover:bg-gray-100/50">
                    <td>Jack</td>
                    <td>26</td>
                    <td>jack@email.com</td>
                  </tr>
                  <tr className="border-b border border-b-[rgb(237,239,242)] hover:bg-gray-100/50">
                    <td>Kate</td>
                    <td>24</td>
                    <td>kate@email.com</td>
                  </tr>
                  <tr className="border-b border border-b-[rgb(237,239,242)] hover:bg-gray-100/50">
                    <td>Liam</td>
                    <td>31</td>
                    <td>liam@email.com</td>
                  </tr>
                  <tr className="border-b border border-b-[rgb(237,239,242)] hover:bg-gray-100/50">
                    <td>Mia</td>
                    <td>23</td>
                    <td>mia@email.com</td>
                  </tr>
                  <tr className="border-b border border-b-[rgb(237,239,242)] hover:bg-gray-100/50">
                    <td>Noah</td>
                    <td>34</td>
                    <td>noah@email.com</td>
                  </tr>
                  <tr className="border-b border border-b-[rgb(237,239,242)] hover:bg-gray-100/50">
                    <td>Olivia</td>
                    <td>36</td>
                    <td>olivia@email.com</td>
                  </tr>
                  <tr className="border-b border border-b-[rgb(237,239,242)] hover:bg-gray-100/50">
                    <td>Parker</td>
                    <td>21</td>
                    <td>parker@email.com</td>
                  </tr>
                  <tr className="border-b border border-b-[rgb(237,239,242)] hover:bg-gray-100/50">
                    <td>Quinn</td>
                    <td>33</td>
                    <td>quinn@email.com</td>
                  </tr>
                  <tr className="border-b border border-b-[rgb(237,239,242)] hover:bg-gray-100/50">
                    <td>Ryan</td>
                    <td>29</td>
                    <td>ryan@email.com</td>
                  </tr>
                  <tr className="border-b border border-b-[rgb(237,239,242)] hover:bg-gray-100/50">
                    <td>Sophia</td>
                    <td>27</td>
                    <td>sophia@email.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
