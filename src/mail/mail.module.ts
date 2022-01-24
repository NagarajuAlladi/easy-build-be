import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global() // 👈 global module
@Module({
  imports: [
    MailerModule.forRootAsync({
      // imports: [ConfigModule], // import module if not enabled globally
      useFactory: (config: ConfigService) => ({
        // transport: config.get("MAIL_TRANSPORT"),
        // or
        transport: {
          // host: process.env.EMAIL_HOST,
          // port: parseInt(process.env.EMAIL_PORT),
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: 'nagarajualladi999@gmail.com',
            pass: 'mecvwwetowscjmhn',
          },
        },
        defaults: {
          from: `"No Reply" ,<'nagarajualladi999@gmail.com'>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      // inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
