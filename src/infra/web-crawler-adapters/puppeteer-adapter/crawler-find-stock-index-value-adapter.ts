import puppeteer from 'puppeteer';

import { CrawlerFindStockIndexValueRequestDto } from "@/application/dtos/crawler-find-stock-index-value-dto/crawler-find-stock-index-value-request-dto";
import { CrawlerFindStockIndexValueResponseDto } from "@/application/dtos/crawler-find-stock-index-value-dto/crawler-find-stock-index-value-response-dto";
import { ICrawlerFindStockIndexValue } from "@/application/infra-protocols/web-crawler/crawler-find-stock-index-value";


// Helper
function convertNumber(value: string) {
  let result = '';
  for (let i = 0; i < value.length; i++) {
    if (value[i] === ',') {
      // ignore
    } else if (value[i] === '.') {
      result += '.'
    } else {
      result += value[i];
    }
  }

  return parseFloat(result);
}


export class CrawlerFindStockIndexValueAdapter implements ICrawlerFindStockIndexValue {
  async scrap(request: CrawlerFindStockIndexValueRequestDto): Promise<CrawlerFindStockIndexValueResponseDto> {
    try {
      const { code, siteUrl } = request;
      let codeOnWeb = '';

      switch (code) {
        case 'IBOV': {
          codeOnWeb = '%5EBVSP';
        };
      }

      const browser = await puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
        ],
      });
      const page = await browser.newPage();

      await page.goto(`https://finance.yahoo.com/quote/%5EBVSP`, {
        waitUntil: 'networkidle2'
      });

      // select element
      const result: any = await page.evaluate(() => {
        const info = Array.from(document.querySelectorAll("#quote-header-info div")).map(x => {
          return x.textContent
        });

        // getting informations
        const marketOpen = !!info[15]?.includes("open");
        let data;
        let fluctuationNegative = 1;
        if (info[15]?.includes("+")) {
          data = info[15].split(" ")[0].split("+");
        } else {
          data = info[15]?.split(" ")[0].split("-");
          fluctuationNegative = -1;
        }

        if (data) {
          const value = data[0];
          const fluctuation = data[1];

          return {
            value,
            fluctuation,
            fluctuationNegative,
            marketOpen
          };
        }
        return false;
      })

      if (!result) {
        return null;
      }

      return {
        value: convertNumber(result.value)
      }

    } catch {
      return null;
    }
  }
}

