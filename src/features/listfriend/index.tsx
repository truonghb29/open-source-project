import { useState, useRef, useEffect } from "react"
import { FindIcon } from "../../assets/icons/FindIcon";
import { FriendIcon } from "../../assets/icons";
import { FacebookIcon } from "../../assets/icons/FacebookIcon";
import { InsIcon } from "../../assets/icons/InsIcon";
import { LinkIcon } from "../../assets/icons/LinkIcon";
import { DeleteIcon } from "../../assets/icons/DeleteIcon";
import HeadlessTippy from "@tippyjs/react/headless";
import Account from "../account";
import { useDebounce } from "../../hooks";
import axios from "axios";


const ListFriend = () => {
  const [friend, setFriend] = useState('')
  const [list, setList] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchResult, setSearchResult] = useState<Array<number | string>>([])
  const [showResult, setShowResult] = useState(true)
  const debounce = useDebounce({ value: friend, delay: 500 });
  const [showFriend, setShowFriend] = useState<Array<number | string>>([])

  console.log(showFriend.data)
  const hanldeSubmit = () => {
    setList(prev => [...prev, friend])
    setFriend('')
    inputRef.current?.focus()
  }
  const hanldeSearch = () => {
    setFriend('')
    inputRef.current?.focus()
  }

  useEffect(() => {
    if (!debounce.trim()) {
      setSearchResult([])
      return;
    }
    fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounce)}&type=less`)
      .then(res => res.json())
      .then(res => {
        setSearchResult(res.data)
      })
  }, [debounce]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`https://tiktok.fullstack.edu.vn/api/users/search?q=a&type=less`)
      setShowFriend(result.data)
    }
    fetchData()
  }, [])
  const handleSearchResult = () => {
    setShowResult(false)
  }

  const handleChange = (e: any) => {
    const searchFriend = e.target.value;
    if (!searchFriend.startsWith(' ')) {
      setFriend(searchFriend)
    }
  }
  return (
    <div>
      <div className="flex flex-col gap-10 justify-between font-sans ">
        <div>
          <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
              <div
                style={{ width: "744px" }}
                className="bg-[#333]"
                tabIndex={-1} {...attrs}
              >
                <h4 className="font-bold leading-5">Accounts</h4>
                <ul>
                  {searchResult.map((result) => (
                    typeof result === 'object' && 'id' in result && (
                      <div
                        className="hover:bg-[#3a3b3c] border border-transparent"
                      >
                        <button className="hover:none bg-transparent pointer-event-none">
                          <Account key={result.id} data={result} />
                        </button>
                      </div>
                    )
                  ))}
                </ul>
              </div>
            )}
            onClickOutside={handleSearchResult}
          >
            <div className="flex flex-row p-3 rounded-full bg-[#333] justify-between">
              <input
                className="w-1/2 text-sm rounded-l-lg bg-transparent outline-none"
                ref={inputRef}
                placeholder="Add friend"
                value={friend}
                onChange={handleChange}
                onFocus={() => setShowResult(true)}
              />
              <div className="flex flex-row justify-end">
                {!!friend && (

                  <button
                    className="bg-transparent"
                    onClick={hanldeSearch}
                  >
                    <DeleteIcon />
                  </button>
                )}
                <button
                  className="rounded-full bg-transparent focus:ring-transparent focus:outline-none"
                  onClick={hanldeSubmit}
                >
                  <FindIcon />
                </button>
              </div>
            </div>
          </HeadlessTippy>
        </div>
        <h2 className="flex flex-row"><FriendIcon />Find friend from another app</h2>
        <div className="flex flex-row justify-around bg-[#333] border-y-8 rounded-full border-transparent" >
          <button className="bg-white rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110">
            <div className="basis-1/4"><FacebookIcon /></div>
          </button >
          <button className="bg-white rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 ">
            <div className="basis-1/4"><InsIcon /></div>
          </button>
          <button className="bg-white rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 ">
            <div className="basis-1/2"><LinkIcon /></div>
          </button>
        </div>
        <h2 className="flex flex-row"><FriendIcon />Your Friends</h2>
        <div>
          {showFriend.data && showFriend.data.map((f) => (
            <div
              key={f.id}
              className="border border-transparent flex flex-row justify-between"
            >
              <button className="hover:none bg-transparent pointer-event-none">
                <Account data={f} />
              </button>
                <DeleteIcon />
            </div>
          ))}

        </div>
        <div
          className="flex justify-center"
        >
          <button
            className="w-32 rouned-full transition ease-in-out delay-150 bg-[#3a3b3c] hover:-translate-y-1 hover:scale-110 border-separate"
          >
            See more
          </button>

        </div>

      </div>

    </div>

  )
}

export default ListFriend
