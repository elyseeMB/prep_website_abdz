import { SimplePaginatorDtoContract } from '@adocasts.com/dto/types'
import ArticleDto from '../../../app/dto/article/article.js'
import ArticleTypes from '#enums/article_types'
import { Tag, TheadWrapper } from '@website/design-system'
import {
  TableWrapper,
  TbodyWrapper,
  TdWrapper,
  ThWrapper,
  TrWrapper,
} from '@website/design-system/src/organisms/table/table.js'
import States from '#enums/state'
import { tuyau } from '~/lib/tuyau.js'
import { ListItem } from '~/components/ui/list/ListItem.js'

type Props = {
  articleTypeId: ArticleTypes
  articles: SimplePaginatorDtoContract<ArticleDto>
}
export default function Index(props: Props) {
  return (
    <div className="w-full">
      <article className="relative w-full h-auto grid grid-row-start-1 grid-row-end-auto shadow-[0_0_0_1px_rgba(237,239,242,1),0_0_2px_0_rgba(0,0,0,0.12)] rounded-8px m-1px">
        <div>
          <div className="w-full h-auto relative before:content-empty before:absolute before:bg-[linear-gradient(90deg,#ffffff_19.93%,transparent_100%)] before:w-20px before:pos-top-6px before:pos-bottom-0 before:z-2 before:h-[calc(100%-6px)] before:rounded-[0_0_0_8px] after:content-empty after:absolute after:bg-[linear-gradient(90deg,transparent_0%,#ffffff_80.05%)] after:w-20px after:pos-top-6px after:pos-right-0 after:pos-bottom-0 after:z-2 after:h-[calc(100%-6px)] after:rounded-[0_0_8px]">
            <div className="relative rounded-8px table  w-full overflow-hidden">
              <TableWrapper>
                <TheadWrapper>
                  <TrWrapper>
                    <ThWrapper>Title</ThWrapper>
                    <ThWrapper>Author</ThWrapper>
                    <ThWrapper>State</ThWrapper>
                    <ThWrapper>Type</ThWrapper>
                    <ThWrapper>Published</ThWrapper>
                  </TrWrapper>
                </TheadWrapper>
                <TbodyWrapper>
                  {props.articles.data.map((article) => (
                    <ListItem
                      id={article.id}
                      key={article.id}
                      title={article.title}
                      authors={article.authors}
                      stateId={article.stateId}
                      articleTypeId={article.articleTypeId}
                      publisheAt={article.publishAt}
                    />
                  ))}
                </TbodyWrapper>
              </TableWrapper>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
