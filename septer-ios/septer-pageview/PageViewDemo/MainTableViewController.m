//
//  MainTableViewController.m
//  PageViewDemo
//
//  Created by 陈良 on 16/4/7.
//  Copyright © 2016年 陈良. All rights reserved.
//

#import "MainTableViewController.h"


@interface MainTableViewController ()
@property (nonatomic ,strong) NSMutableArray *menu;
@property (nonatomic, strong) HomeViewController *homeVC;

@end

@implementation MainTableViewController


-(HomeViewController *)homeVC{
    if (_homeVC == nil) {
        _homeVC = [[HomeViewController alloc] init];
    }
    return _homeVC;
}

-(NSMutableArray *)menu{
    if (_menu == nil) {
        _menu = [NSMutableArray array];
        //添加功能
        [_menu addObject:@"图片浏览器"];
        [_menu addObject:@"多图选择"];
        [_menu addObject:@"顶部标签导航"];
        [_menu addObject:@"通讯录"];
    }
    
    return _menu;
}
- (void)viewDidLoad {
    [super viewDidLoad];
    self.menu;
    self.navigationItem.title = @"实例展示";
    self.navigationController.navigationBar.barTintColor = [[UIColor alloc] initWithRed:0.18 green:0.8 blue:0.38 alpha:1];
    self.navigationController.navigationBar.tintColor = [UIColor whiteColor];
    //设置标题字体样式
    [self.navigationController.navigationBar setTitleTextAttributes:[NSDictionary dictionaryWithObjectsAndKeys:[UIColor whiteColor],UITextAttributeTextColor, nil]];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [_menu count];
}


- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    NSString *reuseIndetifier = @"cell";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:reuseIndetifier forIndexPath:indexPath];
    
    if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:reuseIndetifier];
    }
    
    // Configure the cell...
    cell.textLabel.text = [_menu objectAtIndex:indexPath.row];
    cell.textLabel.textColor = [UIColor whiteColor];
    cell.backgroundColor = [UIColor grayColor];
    return cell;
}
#pragma mark - TableViewDelegate
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath{
    switch (indexPath.row) {
        case 0:
            [self.navigationController pushViewController:[[self storyboard] instantiateViewControllerWithIdentifier:@"photo"] animated:YES];
            break;
        case 2:
            //[self.parentViewController presentViewController:self.homeVC animated:YES completion:nil];
            [self.navigationController pushViewController:self.homeVC animated:YES];
            break;
        case 3:
            //[self.parentViewController presentViewController:self.homeVC animated:YES completion:nil];
            [self.navigationController pushViewController:[[self storyboard] instantiateViewControllerWithIdentifier:@"ContactTableViewController"] animated:YES];
            break;
        default:
            break;
    }
}



@end
