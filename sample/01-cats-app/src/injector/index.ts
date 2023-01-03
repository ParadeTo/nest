import { Type } from '@nestjs/common';
import { MODULE_METADATA } from '@nestjs/common/constants';
import { ApplicationConfig, NestContainer } from '@nestjs/core';
import { InstanceLoader } from '@nestjs/core/injector/instance-loader';

export default class Injector {
  container: NestContainer;

  public async inject(module: any) {
    const applicationConfig = new ApplicationConfig();
    this.container = new NestContainer(applicationConfig);
    const moduleInstance = await this.container.addModule(module, null);
    const { token, metatype } = moduleInstance;
    this.reflectProviders(metatype, token);
    const instanceLoader = new InstanceLoader(this.container);
    instanceLoader.createInstancesOfDependencies();
  }

  public reflectProviders(module: Type<any>, token: string) {
    const providers = [
      ...this.reflectMetadata(MODULE_METADATA.PROVIDERS, module),
    ];
    providers.forEach(provider => {
      return this.container.addProvider(provider as Type<any>, token);
    });
  }

  public reflectMetadata(metadataKey: string, metatype: Type<any>) {
    return Reflect.getMetadata(metadataKey, metatype) || [];
  }
}
