import {
  Company,
  CompanyType,
  Member,
  Part,
  ProviderCustomerCompanyMap,
  Stock,
  SupplierProviderCompanyMap,
} from '@entity/base';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

const SUPPLIER = 'SUPPLIER' as const;
const PROVIDER = 'PROVIDER' as const;
const CUSTOMER = 'CUSTOMER' as const;

export class CompanySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    // company data
    const companyRepository = dataSource.getRepository(Company);

    const supplierCompany = new Company();
    supplierCompany.name = SUPPLIER;
    supplierCompany.type = CompanyType.SUPPLIER;

    const providerCompany = new Company();
    providerCompany.name = PROVIDER;
    providerCompany.type = CompanyType.PROVIDER;

    const customerCompany = new Company();
    customerCompany.name = CUSTOMER;
    customerCompany.type = CompanyType.CUSTOMER;

    await companyRepository.save([
      supplierCompany,
      providerCompany,
      customerCompany,
    ]);

    // company mapping setting
    const supplierProviderCompanyMapRepository = dataSource.getRepository(
      SupplierProviderCompanyMap,
    );

    const supplierProviderCompanyMap = new SupplierProviderCompanyMap();
    supplierProviderCompanyMap.supplier = supplierCompany;
    supplierProviderCompanyMap.provider = providerCompany;

    await supplierProviderCompanyMapRepository.save(supplierProviderCompanyMap);

    const providerCustomerCompanyMapRepository = dataSource.getRepository(
      ProviderCustomerCompanyMap,
    );

    const providerCustomerCompanyMap = new ProviderCustomerCompanyMap();
    providerCustomerCompanyMap.provider = supplierCompany;
    providerCustomerCompanyMap.customer = customerCompany;

    await providerCustomerCompanyMapRepository.save(providerCustomerCompanyMap);

    // member data
    const memberRepository = dataSource.getRepository(Member);

    const supplierMember = new Member();
    supplierMember.company = supplierCompany;
    supplierMember.account = SUPPLIER;
    supplierMember.password = await this.hash(SUPPLIER);
    supplierMember.email = `${SUPPLIER}@gmail.com`;
    supplierMember.phone = '01000000000';
    supplierMember.memo = SUPPLIER;

    const providerMember = new Member();
    providerMember.company = providerCompany;
    providerMember.account = PROVIDER;
    providerMember.password = await this.hash(PROVIDER);
    providerMember.email = `${PROVIDER}@gmail.com`;
    providerMember.phone = '01000000000';
    providerMember.memo = PROVIDER;

    const customerMember = new Member();
    customerMember.company = customerCompany;
    customerMember.account = CUSTOMER;
    customerMember.password = await this.hash(CUSTOMER);
    customerMember.email = `${CUSTOMER}@gmail.com`;
    customerMember.phone = '01000000000';
    customerMember.memo = CUSTOMER;

    await memberRepository.save([
      supplierMember,
      providerMember,
      customerMember,
    ]);

    // part data
    const partRepository = dataSource.getRepository(Part);
    const partDummy = new Array(10).fill(0).map((_el, index) => {
      const part = new Part();
      part.supplier = supplierCompany;
      part.provider = providerCompany;
      part.customer = customerCompany;

      part.supplierCode = `SUPPLIER_CODE_${index}`;
      part.supplierName = `SUPPLIER_NAME_${index}`;
      part.customerCode = `CUSTOMER_CODE_${index}`;
      part.customerName = `SUPPLIER_NAME_${index}`;

      return part;
    });
    await partRepository.save(partDummy);

    // stock data
    const stockRepository = dataSource.getRepository(Stock);
    const stockDummy = partDummy.map((part) =>
      new Array(10).fill(0).map((_el, index) => {
        const stock = new Stock();
        stock.part = part;
        stock.lot = `AA${index}`;
        stock.amount = (this.getRandomInt(9) + 1) * 100;
        return stock;
      }),
    );

    await stockRepository.save(
      stockDummy.reduce((prev, next) => prev.concat(next), []),
      { reload: false },
    );
  }

  private async hash(plainText: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(plainText, saltOrRounds);
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
