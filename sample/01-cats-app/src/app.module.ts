import { Injectable, Module } from '@nestjs/common';
// import { CatsModule } from './cats/cats.module';
// import { CoreModule } from './core/core.module';

@Injectable()
class TestService {
  hello() {
    return 'hello world';
  }
}

@Module({
  providers: [TestService],
})
export class AppModule {
  constructor(testService: TestService) {
    debugger;
    console.log(testService.hello());
  }
}
